import axios from 'axios'

export default class QuizService {
  private BASE_URL = process.env.SERVER_URL;
  getAllQuestions = async (roomId: any) => {
    try {
      const responseJson: any = await axios.post("http://localhost:3000/api/get-all-questions", { roomId: roomId });
      return responseJson.data.data;
    } catch (e: any) {
      console.error(e.message);
      return 401;
    }
  }
}