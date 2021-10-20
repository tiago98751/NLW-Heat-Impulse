import "dotenv/config";
import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

// Github OAUTH

router.get("/github", (request, response) => {
	response.redirect(
		`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
	);
});

router.get("/signin/callback", (request, response) => {
	const { code } = request.query;

	return response.json(code);
});

// End Github OAUTH

const authenticateUserController = new AuthenticateUserController();
router.post("/authenticate", authenticateUserController.handle);

const createMessageController = new CreateMessageController();
router.post("/messages", ensureAuthenticated, createMessageController.handle);

const getLast3MessagesController = new GetLast3MessagesController();
router.get("/messages/last3", getLast3MessagesController.handle);

const profileUserController = new ProfileUserController();
router.get("/profile", ensureAuthenticated, profileUserController.handle);

export { router };
