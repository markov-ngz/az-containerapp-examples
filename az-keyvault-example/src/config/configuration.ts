import { registerAs } from "@nestjs/config";

export default registerAs( 'example' ,()=> ({ example : process.env.EXAMPLE }));
