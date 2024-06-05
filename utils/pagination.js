const URL = process.env.SERVER_URL

const sortFn = (sort) => {
  let sortOption = {};
  if (sort) {
    const sortFields = sort.split(",");
    sortFields.forEach((field) => {
      const sortOrder = field.startsWith("-") ? -1 : 1;
      const fieldName = field.replace(/^-/, "");
      sortOption[fieldName] = sortOrder;
    });
  }
  return sortOption;
};

const populateAdditionalFields = async (results, populateFields) => {
  try {
    // Iterate over each document in the results array
    for (let i = 0; i < results.length; i++) {
      const document = results[i];
      // Iterate over each field to populate
      for (const field of populateFields) {
        // Check if the field exists in the document
        if (document[field]) {
          // Populate the field
          await document.populate(field);
          // Update the document in the results array with the populated field
          results[i] = document;
        }
      }
    }
    return results;
  } catch (error) {
    console.error("Error occurred while populating additional fields:", error);
    return results;
  }
};

const paginate = async (model, query, route, ...populateFields) => {
  try {
    const { page = 1, perPage = 10, includes, sort, filter} = query;
    const sortOption = sortFn(sort);
    const selectFields = includes ? includes.replace(/,/g, " ") : "";
    const results = await model
      .find({ ...filter })
      .select(selectFields)
      .skip((page - 1) * perPage)
      .sort(sortOption)
      .limit(perPage);
    let populatedResults = results;
    // Populate additional fields if provided
    populatedResults = await populateAdditionalFields(populatedResults, populateFields);

    const totalCount = await model.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    populatedResults = populatedResults.reverse();
    return {
      data: populatedResults,
      _meta: {
        currentPage: +page,
        perPage: +perPage,
        totalCount,
        totalPages,
      },
      _links: {
        self: `${URL}api/${model.modelName}?page=${page}&page=${perPage}`, // Self link
        first: `${URL}api/${model.modelName}?page=1&page=${perPage}`, // First page link
        prev: page > 1 ? `${URL}api/${model.modelName}?page=${+page - 1}&page=${perPage}` : null, // Previous page link
        next: page < totalPages ? `${URL}api/${model.modelName}?page=${+page + 1}&page=${perPage}` : null, // Next page link
        last: `${URL}api/${model.modelName}?page=${totalPages}&page=${perPage}`, // Last page link
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Error occurred while paginating results",
      error: error.message,
    };
  }
};

module.exports = paginate;