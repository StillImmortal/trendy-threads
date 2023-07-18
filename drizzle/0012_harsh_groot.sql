CREATE TABLE `stores` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`description` text,
	`slug` text,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `stores` (`user_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `stores` (`user_id`);--> statement-breakpoint
CREATE INDEX `slug_idx` ON `stores` (`slug`);