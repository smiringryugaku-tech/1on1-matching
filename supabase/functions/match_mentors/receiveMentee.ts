export async function receiveMentee(req: Request) {
    try {
      const body = await req.json();
      return body; // 今は型チェックなしでそのまま返す
    } catch (e) {
      throw new Error("Invalid JSON input");
    }
  }
  