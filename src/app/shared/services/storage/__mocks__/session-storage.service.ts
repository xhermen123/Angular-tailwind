export const SessionStorageService = jest.fn().mockImplementation(() => {
  let _data: any = {};

  return {
    getItem: jest.fn((key: string) => {
      return _data[key];
    }),
    setItem: jest.fn((key: string, value: any) => {
      _data[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete _data[key];
    }),
    clear: jest.fn(() => {
      _data = {};
    }),
  };
});
