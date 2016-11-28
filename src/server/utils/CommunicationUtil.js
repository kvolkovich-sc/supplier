/**
 * Utility function to build bad response JSON in correct format and with correct status.
 *
 * @param res Http response
 * @param status A status
 * @param globalErrors A array of global errors
 * @param fieldErrors A array of field errors
 */
const buildBadResponse = (res, status, globalErrors = [], fieldErrors = []) => {
  res.status(status).send({
    errors: {
      globalErrors: globalErrors,
      fieldErrors: fieldErrors,
    },
  });
};

export {
  buildBadResponse,
}
