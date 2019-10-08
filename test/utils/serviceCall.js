export default (request, versions, messages) => {
  if (typeof versions === 'boolean' && versions === false) {
    request.error();
  } else if (request.url.includes('Version')) {
    request.success(versions);
  } else {
    request.success(messages);
  }
};
