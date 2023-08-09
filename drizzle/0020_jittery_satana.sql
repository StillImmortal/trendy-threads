CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(255),
	`storeId` int NOT NULL,
	`stripeAccountId` varchar(255) NOT NULL,
	`stripeAccountCreatedAt` int NOT NULL,
	`stripeAccountExpiresAt` int NOT NULL,
	`detailsSubmitted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()));
