import CategoryTable from "./productAndgategoryTables/categoryTable";
import ProductsTable from "./productAndgategoryTables/productsTable";

export default function ManageProducts(){

    return(
        <>
            <ProductsTable />
            <CategoryTable />
        </>
    )
}