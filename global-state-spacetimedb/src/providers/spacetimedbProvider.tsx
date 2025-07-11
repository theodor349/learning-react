"use client";

import { useEffect } from 'react';
import {getDbConnection} from "@/utils/spacetimedb/connectionFactory";

const SpacetimeDBProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    getDbConnection();
  }, []);

  // It doesn't need to render anything itself, just pass children through.
  return <>{children}</>;
};

export default SpacetimeDBProvider;