import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IPortalProps {
	children: React.ReactNode;
}

const Portal = ({ children }: IPortalProps) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => setIsBrowser(true), []);

	if (isBrowser) {
		// Make generic
		const el = document.getElementById("modal-root");
		if (el) return ReactDOM.createPortal(children, el);
		return null;
	}
	return null;
};

export default Portal;
