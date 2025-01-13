import { Donor } from "../services/interfaces";
import createLoadableStore from "@/lib/store/loadable-store/createLoadableStore";

const donorStore = createLoadableStore<Donor>();

export default donorStore;
