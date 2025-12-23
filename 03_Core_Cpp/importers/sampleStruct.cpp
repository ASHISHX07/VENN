#include <iostream>
#include "../headers/bufferHeader.h"

int main() {

    const bufferHeader buffer{2345};

    std::cout << "Hello from Ash! and" << buffer.instrumentToken;
    return 0;
}