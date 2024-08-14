const { Op } = require("sequelize");

const filterQuery = (req, searchField) => {
  // filter query
  let filters = { ...req.query };

  // [sort, page, limit] exclude from filters
  const excludeFilters = ["sort", "page", "limit", "fields"];
  excludeFilters.forEach((field) => delete filters[field]);

  // filter where condition
  let whereCondition = [];
  for (let key in filters) {
    if (key === "search") {
      whereCondition.push({
        [Op.or]: searchField.map((item) => {
          return {
            [item]: {
              [Op.like]: `%${filters[key]}%`,
            },
          };
        }),
      });
    } else {
      if (typeof filters[key] === "string") {
        whereCondition.push({ [key]: filters[key] });
      } else if (typeof filters[key] === "object") {
        const innerObject = filters[key];
        for (let innerKey in innerObject) {
          whereCondition.push({
            [key]: { [Op[innerKey]]: Number(innerObject[innerKey]) },
          });
        }
      }
    }
  }

  // convert whereCondition array to object
  filters = whereCondition.reduce((a, b) => Object.assign(a, b), {});

  // queries
  const queries = {};

  // Specify the fields to display
  if (req.query.fields) {
    const fields = req.query.fields.split(",");
    queries.fields = fields;
  }

  // sort query
  if (req.query.sort) {
    const sortItems = req.query.sort.split(",");
    queries.sortBy = sortItems.map((item) => {
      if (item.startsWith("-")) {
        return [item.slice(1), "DESC"];
      } else {
        return [item, "ASC"];
      }
    });
  }

  // pagination query
  if (!req.query.page && !req.query.limit) {
    queries.limit = 10;
    queries.page = 1;
  }

  if (req.query.page || req.query.limit) {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * Number(limit);
    queries.page = Number(page);
    queries.offset = skip;
    queries.limit = Number(limit);
  }

  return { filters, queries };
};

// export filterQuery
module.exports = filterQuery;
