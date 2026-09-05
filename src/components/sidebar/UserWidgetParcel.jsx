import { useCallback, useState } from "react";
import Parcel from "single-spa-react/parcel";

import { navbarUser } from "../../data/user.mock";
import { loadUserWidgetParcel } from "../../parcels/userWidgetParcel";

export const handleUserProfile = () => undefined;

export const handleUserLogout = () => undefined;

export default function UserWidgetParcel() {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const handleUserWidgetError = useCallback(() => {
    setIsUnavailable(true);
  }, []);

  if (isUnavailable) {
    return (
      <div className="bb-sidebar__user-widget-fallback" aria-live="polite">
        Usuario indisponivel
      </div>
    );
  }

  return (
    <div className="bb-sidebar__user-widget">
      <Parcel
        config={loadUserWidgetParcel}
        user={navbarUser}
        onProfile={handleUserProfile}
        onLogout={handleUserLogout}
        handleError={handleUserWidgetError}
        wrapClassName="bb-sidebar__user-widget-parcel"
      />
    </div>
  );
}
