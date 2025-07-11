import Table_main from "../../components/Table_main";

export default function Page() {
  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        <header className="">
          <div>
            <h1 className="text-2xl font-bold">📦 Stock</h1>
            <p className="text-gray-500 text-sm">Manage your stock</p>
          </div>
        </header>

        <Table_main />
      </div>
    </>
  );
}
