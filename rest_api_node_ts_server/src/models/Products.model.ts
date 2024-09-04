import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products"
})

class Products extends Model {
    @Column({
        type : DataType.STRING(50)
    })
    name: string

    @Column({
        type : DataType.DECIMAL(6 , 2)
    })
    price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Products