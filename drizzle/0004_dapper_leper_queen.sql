CREATE TABLE `products` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(127) NOT NULL,
	`user_id` bigint NOT NULL);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`author` varchar(127) NOT NULL);
--> statement-breakpoint
DROP TABLE `authors`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
DROP TABLE `quotes`;--> statement-breakpoint
CREATE UNIQUE INDEX `title` ON `products` (`title`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `products` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `author` ON `users` (`author`);