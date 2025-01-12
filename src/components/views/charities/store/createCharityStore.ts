import { Charity } from "../services/interfaces";
import createLoadableStore from "@/lib/store/loadable-store/createLoadableStore";

const charityStore = createLoadableStore<Charity>();

export default charityStore;
