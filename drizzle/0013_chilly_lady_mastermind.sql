ALTER TABLE `products` ADD `store_id` int NOT NULL;--> statement-breakpoint
CREATE INDEX `store_id_idx` ON `products` (`store_id`);