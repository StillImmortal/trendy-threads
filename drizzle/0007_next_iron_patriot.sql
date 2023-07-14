CREATE TABLE `carts` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`user_id` bigint NOT NULL,
	`items` json DEFAULT ('null'),
	`created_at` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `products` (
	`id` bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`brand` varchar(127) NOT NULL DEFAULT 'Custom',
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` enum('clothing','shoes','accessories') NOT NULL DEFAULT 'clothing',
	`sub_category` varchar(255) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`tags` json DEFAULT ('null'),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE INDEX `brand_idx` ON `products` (`brand`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `products` (`name`);--> statement-breakpoint
CREATE INDEX `price_idx` ON `products` (`price`);--> statement-breakpoint
CREATE INDEX `create_at_idx` ON `products` (`created_at`);