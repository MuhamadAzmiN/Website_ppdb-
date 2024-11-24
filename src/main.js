import { web } from "./app/web.js";
import { logger } from "./app/looging.js";


const PORT  = 3000

web.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
