"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiTrash, FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { Project } from "@/util/type";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Table_main() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const mockProjects: Project[] = [
    {
      id: "#3065",
      name: "Amena Sabuwala",
      Sales: "45",
      avaliable: 56,
      serial_number: 2437155252,
      qrcode: "244266efdfh78373737",
      avatar: "https://i.pravatar.cc/24?img=1",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
    {
      id: "#3066",
      name: "Ifeoluwa Johnson",
      Sales: "22",
      avaliable: 3,
      serial_number: 2637456262,
      qrcode: "338812ddfeu29292929",
      avatar: "https://i.pravatar.cc/24?img=2",
    },
  ];

  const filteredProjects = mockProjects.filter((project) => {
    return (
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.serial_number.toString().includes(search)
    );
  });

  return (
    <>
      <Input
        type="text"
        placeholder="Search by name or serial number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 border border-gray-300 rounded px-4 py-2 text-sm mb-4"
      />
      <Table>
        <TableCaption>A list of your stock items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="hidden md:table-cell">Sales</TableHead>
            <TableHead className="hidden md:table-cell">Serial No</TableHead>
            <TableHead className="hidden md:table-cell">QR Code</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Actions
            </TableHead>
            <TableHead className="md:hidden text-right">More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              const isLowStock = project.avaliable <= 3;
              const isExpanded = expanded === index;

              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell className="hidden md:table-cell">
                      {project.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={project.avatar}
                          alt={project.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="truncate">{project.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isLowStock
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}>
                        {isLowStock
                          ? `⚠️ Low (${project.avaliable})`
                          : `Available (${project.avaliable})`}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className=" text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                        Sales {project.Sales}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-gray-600">
                      {project.serial_number}
                    </TableCell>
                    <TableCell
                      className="hidden md:table-cell text-sm text-blue-600 underline truncate max-w-[200px]"
                      title={project.qrcode}>
                      {project.qrcode}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right">
                      <Button
                        title="Delete"
                        className="hover:text-red-600 transition cursor-pointer">
                        <FiTrash />
                      </Button>
                    </TableCell>
                    <TableCell className="md:hidden text-right">
                      <button
                        onClick={() => setExpanded(isExpanded ? null : index)}
                        className="text-blue-500 text-sm flex items-center gap-1">
                        {isExpanded ? (
                          <>
                            Hide <FiChevronUp />
                          </>
                        ) : (
                          <>
                            More <FiChevronDown />
                          </>
                        )}
                      </button>
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow className="md:hidden ">
                      <TableCell colSpan={8} className="text-sm p-4 space-y-2">
                        <div>
                          <strong>ID:</strong> {project.id}
                        </div>
                        <div>
                          <strong>Sales:</strong> {project.Sales}
                        </div>
                        <div>
                          <strong>Serial No:</strong> {project.serial_number}
                        </div>
                        <div>
                          <strong>QR Code:</strong> {project.qrcode}
                        </div>
                        <div className="pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-300">
                            <FiTrash className="mr-2" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No matching results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default Table_main;
