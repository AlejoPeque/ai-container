import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const hf = new HfInference(secretKey);

export default hf;
