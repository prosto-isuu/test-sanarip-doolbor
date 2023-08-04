import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 10) {
            const response = await axios.get("https://fakestoreapi.com/products", {
                params : {
                    _limit: limit,
                    _page: page
                }
            })
            return response
    }
    static async getById(id) {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
            return response
    }
    static async getCommentsById(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response
    }
}