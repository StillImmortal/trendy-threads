DROP INDEX `brand_idx` ON `products`;--> statement-breakpoint
ALTER TABLE `carts` ADD `paymentIntentId` varchar(255);--> statement-breakpoint
ALTER TABLE `carts` ADD `clientSecret` varchar(255);--> statement-breakpoint
ALTER TABLE `stores` ADD `stripeAccountId` varchar(255);--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `brand`;