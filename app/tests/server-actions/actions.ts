"use server";

export async function testServerAction(formData: FormData) {
  const start = Date.now();

  // Simulate some server processing
  await new Promise((resolve) => setTimeout(resolve, 50));

  const message = formData.get("message") as string;

  const processingTime = Date.now() - start;

  return {
    success: true,
    message: "Server action executed successfully!",
    serverTimestamp: new Date().toISOString(),
    receivedData: message || "(no message)",
    processingTime,
  };
}
