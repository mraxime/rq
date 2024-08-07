'use client';

import { useEffect, useState, type FC, type ReactNode } from 'react';
import PageLoading from 'src/components/base/PageLoading';

type Props = {
	children: ReactNode;
};

/**
 * Forces children to be rendered in client side.
 * Using this on root layout seems to fix Mui rendering issues with ssr.
 */
const ForceClient: FC<Props> = ({ children }) => {
	const [showLoader, setShowLoader] = useState(true);

	useEffect(() => {
		if (typeof window !== undefined) {
			setShowLoader(false);
		}
	}, []);

	if (showLoader) return <PageLoading />;
	return children;
};

export default ForceClient;
