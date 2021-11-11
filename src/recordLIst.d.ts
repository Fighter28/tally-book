type RecordItem = {
    tags: Tag[]
    notes: string
    type: string
    amount: number // 数据类型 object | string
    createdAt?: string  // 类 / 构造函数
}
export default RecordItem