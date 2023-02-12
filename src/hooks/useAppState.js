import { useContext } from "react";
import AppStateContext from "../providers/appStateProvider";

const useAppState = () => {
  const { appState, setAppState } = useContext(AppStateContext);

  return { appState, setAppState };
};

export default useAppState;
