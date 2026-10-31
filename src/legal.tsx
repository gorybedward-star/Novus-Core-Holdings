import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Privacy } from "./legal/Privacy";
import { Terms } from "./legal/Terms";
import "./index.css";

const page = document.getElementById("root")!.dataset.page;
createRoot(document.getElementById("root")!).render(<StrictMode>{page === "terms" ? <Terms /> : <Privacy />}</StrictMode>);
