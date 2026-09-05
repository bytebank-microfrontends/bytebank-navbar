export const USER_WIDGET_PARCEL_NAME = "@bytebank/user-widget";

const isLifecycle = (lifecycle) => typeof lifecycle === "function";

const isParcelConfig = (parcelConfig) =>
  Boolean(
    parcelConfig &&
      isLifecycle(parcelConfig.bootstrap) &&
      isLifecycle(parcelConfig.mount) &&
      isLifecycle(parcelConfig.unmount)
  );

export const resolveUserWidgetParcelConfig = (moduleNamespace) => {
  const parcelConfig = moduleNamespace?.default ?? moduleNamespace;

  if (!isParcelConfig(parcelConfig)) {
    throw new Error(
      `${USER_WIDGET_PARCEL_NAME} did not expose bootstrap, mount and unmount lifecycles`
    );
  }

  return parcelConfig;
};

export const userWidgetParcelModuleLoader = {
  importModule(moduleName) {
    return import(/* webpackIgnore: true */ moduleName);
  },
};

export const loadUserWidgetParcel = () =>
  userWidgetParcelModuleLoader
    .importModule(USER_WIDGET_PARCEL_NAME)
    .then(resolveUserWidgetParcelConfig);
