DROP INDEX `name_idx` ON `stores`;--> statement-breakpoint
ALTER TABLE `stores` ADD `name` varchar(255) NOT NULL;--> statement-breakpoint
CREATE INDEX `name_idx` ON `stores` (`name`);