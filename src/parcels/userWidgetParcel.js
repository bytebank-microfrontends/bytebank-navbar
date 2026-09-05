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

export const loadUserWidgetParcel = () => {
  if (!window.System || typeof window.System.import !== "function") {
    return Promise.reject(
      new Error(`${USER_WIDGET_PARCEL_NAME} is not available in the import map`)
    );
  }

  return window.System.import(USER_WIDGET_PARCEL_NAME).then(
    resolveUserWidgetParcelConfig
  );
};
