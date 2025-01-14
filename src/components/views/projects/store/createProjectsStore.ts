import { Project } from "../services/interfaces";
import createLoadableStore from "@/lib/store/loadable-store/createLoadableStore";

const projectStore = createLoadableStore<Project>();

export default projectStore;
