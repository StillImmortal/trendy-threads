CREATE TABLE `post` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int,
	`image_url` varchar(64),
	`title` varchar(64),
	`text` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int,
	`image_url` varchar(64),
	`title` varchar(64),
	`brand` varchar(32),
	`price` decimal,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `email` varchar(128);--> statement-breakpoint
ALTER TABLE `user` ADD `password` varchar(128);--> statement-breakpoint
ALTER TABLE `user` ADD `image_url` varchar(64);--> statement-breakpoint
ALTER TABLE `user` ADD `phone` varchar(32);--> statement-breakpoint
ALTER TABLE `user` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` ADD `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `full_name`;--> statement-breakpoint
ALTER TABLE `post` ADD CONSTRAINT `post_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;