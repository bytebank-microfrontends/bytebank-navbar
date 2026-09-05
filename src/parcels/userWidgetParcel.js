export const USER_WIDGET_PARCEL_NAME = "@bytebank/user-widget";

export const loadUserWidgetParcel = () => {
  if (!window.System || typeof window.System.import !== "function") {
    return Promise.reject(
      new Error(`${USER_WIDGET_PARCEL_NAME} is not available in the import map`)
    );
  }

  return window.System.import(USER_WIDGET_PARCEL_NAME);
};
