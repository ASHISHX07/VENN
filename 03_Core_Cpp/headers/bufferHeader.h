struct bufferHeader
{
    int instrumentToken{};
    int feedTimeAtExchg{};
    int arrivalTime{};
    float ltp{};
    float oi{};
    float coi{};
    float volume{};
};