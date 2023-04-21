export type LoggerArgs = any[];

export default (...args: LoggerArgs) => {
  console.log(...args)
};