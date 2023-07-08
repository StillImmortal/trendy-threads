DROP INDEX `author` ON `users`;--> statement-breakpoint
ALTER TABLE `users` ADD `name` varchar(127) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `name` ON `users` (`name`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `author`;