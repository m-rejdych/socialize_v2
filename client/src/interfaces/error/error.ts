export default interface ErrorInterface extends Error {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
    status: number;
  };
}
