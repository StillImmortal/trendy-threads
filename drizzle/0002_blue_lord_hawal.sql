ALTER TABLE `post` DROP FOREIGN KEY `post_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `product` DROP FOREIGN KEY `product_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `post` ADD CONSTRAINT `post_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;