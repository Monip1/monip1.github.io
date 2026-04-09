
public class variables {


    /**
     * @param c: character to print
     */
    private static int char2ascii(char c) {
        int ascii = c;
        return ascii;
    }


    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        double c = 2.5;


        System.out.println("a = " + a);
        System.out.println("b = " + b);
        System.out.println("c = " + c);
        System.out.println("a / b = " + a / b);
        System.out.println("a % b = " + a % b);
        System.out.println("a / c = " + a / c);
        System.out.println("a / (int) c = " + a / (int) c);
        System.out.println("(int) (a / c) = " + (int) (a / c));


        char uppercase_a = 'A';
        char lowercase_a = 'a';
        char num_zero = '0';
       
        int ascii_uppercase_a = char2ascii(uppercase_a);
        int ascii_lowercase_a = char2ascii(lowercase_a);
        int ascii_num_zero = char2ascii(num_zero);


        System.out.println("ASCII of A = " + ascii_uppercase_a);
        System.out.println("ASCII of a = " + ascii_lowercase_a);
        System.out.println("ASCII of 0 = " + ascii_num_zero);
    }
}
