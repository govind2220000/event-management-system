-- DropForeignKey
ALTER TABLE "EventRegistration" DROP CONSTRAINT "EventRegistration_eventId_fkey";

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
