import { LoaderFunctionArgs } from "react-router-dom";

export type CustomLoader<CustomLoaderData> = (
  args: LoaderFunctionArgs & CustomLoaderData
) => any | Promise<any>;

export type CustomRoute<CustomLoaderData> = {
  default: () => JSX.Element;
  loader?: CustomLoader<CustomLoaderData>;
};

export const createCustomRoute = <CustomLoaderData>(data: CustomLoaderData) => {
  return (importRoute: () => Promise<CustomRoute<CustomLoaderData>>) => {
    return async () => {
      const { default: Component, loader } = await importRoute();
      return {
        Component,
        loader: async (args: LoaderFunctionArgs) => {
          return (await loader?.({ ...args, ...data })) || null;
        },
      };
    };
  };
};
