import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

const OAuthError = () => {
  const oauthError: any = useSelector<RootState>(
    (state) => state.providerError
  );
  return <>{oauthError ? <p>{oauthError}</p> : null}</>;
};

export default OAuthError;
