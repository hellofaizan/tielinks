"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function LinkStats({ data }: { data: any }) {
  const [tableData, setTableData] = useState(data);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Links</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
         {
            tableData.map((link: any) => (
              <TableRow key={link.id}>
                <TableCell>{link?.url}</TableCell>
                <TableCell className="text-right">{link?._count?.linkClicks}</TableCell>
              </TableRow>
            ))
         }
        </TableBody>
      </Table>
    </div>
  );
}
