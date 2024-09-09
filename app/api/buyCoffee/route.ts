import { NextRequest, NextResponse } from "next/server";

import { contract, web3 } from "../../utils/web3";

export async function POST(req: NextRequest) {
  const { name, message, amount, account } = await req.json();

  console.log("Buying coffee:", { name, message, amount, account });

  if (!account) {
    return NextResponse.json(
      { success: false, message: "MetaMask account not connected." },
      { status: 400 }
    );
  }

  try {
    const wei = web3.utils.toWei(amount.toString(), "ether");
    console.log("Buying coffee in wei:", wei);

    await contract.methods.buyCoffee(name, message).send({
      from: account,
      value: wei,
    });
    return NextResponse.json(
      { success: true, message: "Coffee bought successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error buying coffee:", error);
    return NextResponse.json(
      { success: false, message: "Failed to buy coffee." },
      { status: 500 }
    );
  }
}
