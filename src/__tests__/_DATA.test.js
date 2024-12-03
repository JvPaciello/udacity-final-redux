import {
  _saveQuestion,
  _saveQuestionAnswer,
  _getUsers,
  _getQuestions,
} from "../_DATA";


describe("_saveQuestion", () => {
  it("should return the saved question when provided with correctly formatted data", async () => {
    const questionData = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "testUser",
    };

    const result = await _saveQuestion(questionData);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("author", questionData.author);
    expect(result).toHaveProperty("optionOne");
    expect(result).toHaveProperty("optionTwo");

    expect(result.optionOne).toHaveProperty("votes");
    expect(result.optionOne).toHaveProperty("text", questionData.optionOneText);
    expect(result.optionTwo).toHaveProperty("votes");
    expect(result.optionTwo).toHaveProperty("text", questionData.optionTwoText);
  });

  it("should return an error if incorrect data is passed", async () => {
    const incorrectData = {
      optionOneText: "",
      optionTwoText: "Option two text",
      author: "",
    };
    await expect(_saveQuestion(incorrectData)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("should return an error if any of the fields are missing", async () => {
    const missingFields = {
      optionOneText: "Option one text",

      author: "authorId",
    };
    await expect(_saveQuestion(missingFields)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
  describe("_saveQuestionAnswer", () => {
    it("should save the question answer and populate all expected fields", async () => {
      const testAnswer = {
        authedUser: "sarahedo",
        qid: "vthrdm985a262al8qx3do",
        answer: "optionOne",
      };

      await _saveQuestionAnswer(testAnswer);
      const users = await _getUsers();
      const questions = await _getQuestions();

      expect(users["sarahedo"].answers["vthrdm985a262al8qx3do"]).toBe(
        "optionOne"
      );

      expect(questions["vthrdm985a262al8qx3do"].optionOne.votes).toContain(
        "sarahedo"
      );
      expect(questions["vthrdm985a262al8qx3do"].optionTwo.votes).not.toContain(
        "sarahedo"
      );
    });

    it("should throw an error if invalid data is provided", async () => {
      const invalidAnswer = {
        authedUser: "",
        qid: "vthrdm985a262al8qx3do",
        answer: "optionOne",
      };

      await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
        "Please provide authedUser, qid, and answer"
      );
    });
  });

  describe("_saveQuestionAnswer Error Handling", () => {
    it("should throw an error if authedUser is missing", async () => {
      const invalidData = {
        authedUser: "",
        qid: "vthrdm985a262al8qx3do",
        answer: "optionOne",
      };

      await expect(_saveQuestionAnswer(invalidData)).rejects.toEqual(
        "Please provide authedUser, qid, and answer"
      );
    });

    it("should throw an error if qid is missing", async () => {
      const invalidData = {
        authedUser: "sarahedo",
        qid: "",
        answer: "optionOne",
      };

      await expect(_saveQuestionAnswer(invalidData)).rejects.toEqual(
        "Please provide authedUser, qid, and answer"
      );
    });

    it("should throw an error if answer is missing", async () => {
      const invalidData = {
        authedUser: "sarahedo",
        qid: "vthrdm985a262al8qx3do",
        answer: "",
      };

      await expect(_saveQuestionAnswer(invalidData)).rejects.toEqual(
        "Please provide authedUser, qid, and answer"
      );
    });
  });
});
