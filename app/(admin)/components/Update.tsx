"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface NewItemForm {
  name: string;
  avaliable: string;
  avatarFile: File | null;
}

export default function Update() {
  const [forms, setForms] = useState<NewItemForm[]>([
    { name: "", avaliable: "", avatarFile: null },
  ]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = e.target;
    setForms((prev) => {
      const updated = [...prev];
      if (name === "avatarFile") {
        updated[index].avatarFile = files?.[0] ?? null;
      } else {
        if (name === "name") updated[index].name = value;
        if (name === "avaliable") updated[index].avaliable = value;
      }
      return updated;
    });
  };

  const addForm = () => {
    if (forms.length >= 10) return;
    setForms((prev) => [
      ...prev,
      { name: "", avaliable: "", avatarFile: null },
    ]);
  };

  const removeForm = (index: number) => {
    if (forms.length === 1) return;
    setForms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const toSubmit = forms.filter((f) => f.name && f.avaliable);
    if (toSubmit.length === 0) {
      setMsg("Please fill at least one item.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      await Promise.all(
        toSubmit.map(async (form) => {
          const body = new FormData();
          body.append("name", form.name);
          body.append("avaliable", form.avaliable);
          if (form.avatarFile) body.append("avatar", form.avatarFile);

          const res = await fetch("/api/projects", { method: "POST", body });
          if (!res.ok) throw new Error("Failed to create item");
        })
      );

      setMsg(` ${toSubmit.length} item(s) created`);
      setForms([{ name: "", avaliable: "", avatarFile: null }]);
    } catch (err) {
      console.error(err);
      setMsg("Creation failed for some items");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen   justify-center ">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-2xl">📦 Create New Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {forms.map((form, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative">
                <span className="absolute top-2 border-2 left-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Item {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeForm(idx)}
                  className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700">
                  ✕
                </button>
                <Input
                  name="name"
                  type="text"
                  placeholder="Item Name"
                  value={form.name}
                  onChange={(e) => handleChange(idx, e)}
                />

                <Input
                  name="avaliable"
                  type="number"
                  placeholder="Initial Stock"
                  value={form.avaliable}
                  onChange={(e) => handleChange(idx, e)}
                />

                <Input
                  name="avatarFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(idx, e)}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col  justify-between items-center gap-4">
          <Button
            onClick={addForm}
            disabled={forms.length >= 10 || loading}
            variant="outline"
            className="w-full sm:w-auto">
            + Add More
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto">
            {loading ? "Saving…" : "Create Items"}
          </Button>
        </CardFooter>
        {msg && (
          <p className="px-6 pb-6 text-center text-sm text-red-700 dark:text-red-200">
            {msg}
          </p>
        )}
      </Card>
    </div>
  );
}
