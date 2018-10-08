Option Compare Database
Option Explicit

Dim strFormula As String, strCurrentNumber As String, strAction As String, strDoneEquals As String
Dim strButton As String
Dim dblTotal As Double

Private Sub Operator(strButtonstrAction As String)
            
    If strDoneEquals = "1" Then
        strDoneEquals = ""
        strCurrentNumber = CStr(dblTotal)
        strFormula = ""
        strAction = ""
    End If

    If strAction <> "" Then
        Call Equals
        strAction = strButtonstrAction
        strFormula = strFormula + " " + strButtonstrAction
    Else
        If IsNumeric(strCurrentNumber) = False Then
            dblTotal = 0
        Else
            dblTotal = CDbl(strCurrentNumber)
        End If

        strAction = strButtonstrAction
        strFormula = strFormula + " " + strCurrentNumber + " " + strButtonstrAction
    End If

    strFormula = Trim(strFormula)
    txtFormula = strFormula
    strCurrentNumber = "0"

End Sub

Private Sub Equals()
    Dim dblYvalue As Double
    
    'make sure it is a number
    If IsNumeric(strCurrentNumber) = False Then
        strCurrentNumber = "0"
    End If
    
    dblYvalue = CDbl(strCurrentNumber)

    If strDoneEquals = "1" Then
        strFormula = strFormula + " " + strAction + " " + strCurrentNumber
    Else
        strFormula = strFormula + " " + strCurrentNumber
    End If

    'calculate the result
    If strAction = "X" Then
        dblTotal = dblTotal * dblYvalue
    ElseIf strAction = "/" Then
        If dblYvalue = 0 Then
            strCurrentNumber = "0"
            dblTotal = 0
            strAction = ""
            strDoneEquals = ""

            txtResult = "Can't divide by zero"
            txtFormula = strFormula
            strFormula = ""
            
            Exit Sub
        Else
            dblTotal = dblTotal / dblYvalue
        End If
    ElseIf strAction = "-" Then
        dblTotal = dblTotal - dblYvalue
    ElseIf strAction = "+" Then
        dblTotal = dblTotal + dblYvalue
    Else
        'disable after finished testing
        'msgbox("fix strAction")
        Exit Sub
    End If

    'update the display
    txtResult = CStr(dblTotal)
    txtFormula = strFormula
End Sub

Private Sub subNumber(strButton As String)
    'reset if equals done
    If strDoneEquals = "1" Then
        strDoneEquals = ""
        strCurrentNumber = "0"
        strFormula = ""
        strAction = ""
        txtFormula = ""
    End If

    strCurrentNumber = strCurrentNumber + strButton

    'remove leading default 0
    If Left(strCurrentNumber, 1) = "0" And Len(strCurrentNumber) > 1 And Mid(strCurrentNumber, 1, 2) <> "." Then
        strCurrentNumber = Mid(strCurrentNumber, 2, Len(strCurrentNumber))
    End If

    txtResult = strCurrentNumber

End Sub

Private Sub cmd0_Click()
    Call subNumber("0")

End Sub

Private Sub cmd1_Click()
    Call subNumber("1")

End Sub

Private Sub cmd2_Click()
    Call subNumber("2")

End Sub

Private Sub cmd3_Click()
    Call subNumber("3")

End Sub

Private Sub cmd4_Click()
    Call subNumber("4")

End Sub

Private Sub cmd5_Click()
    Call subNumber("5")

End Sub

Private Sub cmd6_Click()
    Call subNumber("6")

End Sub

Private Sub cmd7_Click()
    Call subNumber("7")
    
End Sub

Private Sub cmd8_Click()
    Call subNumber("8")

End Sub

Private Sub cmd9_Click()
    Call subNumber("9")

End Sub

Private Sub cmdCA_Click()
    strCurrentNumber = "0"
    dblTotal = 0
    strAction = ""
    strFormula = ""
    strDoneEquals = ""

    txtResult = strCurrentNumber
    txtFormula = strFormula

End Sub

Private Sub cmdCV_Click()
    If strDoneEquals = "1" Then
        strCurrentNumber = "0"
        dblTotal = 0
        strAction = ""
        strFormula = ""
        strDoneEquals = ""

        txtResult = strCurrentNumber
        txtFormula = strFormula
    Else
        strCurrentNumber = "0"
        txtResult = strCurrentNumber
    End If

End Sub

Private Sub cmdDelete_Click()
    'delete 1 letter
    If strDoneEquals = "1" Then
        strDoneEquals = ""
        strCurrentNumber = "0"
        strFormula = ""
        strAction = ""
        txtFormula = ""
    Else
        If Len(strCurrentNumber) > 1 Then
            strCurrentNumber = Mid(strCurrentNumber, 1, Len(strCurrentNumber) - 1)
        Else
            strCurrentNumber = "0"
        End If
    End If
    txtResult = strCurrentNumber

End Sub

Private Sub cmdDivide_Click()
    Call Operator("/")
    
End Sub

Private Sub cmdEquals_Click()
    'calculate result
    If strAction <> "" Then
        Call Equals
        strDoneEquals = "1"
    End If

End Sub

Private Sub cmdMultiply_Click()
    Call Operator("X")

End Sub

Private Sub cmdPeriod_Click()
    'reset if equals done
    If strDoneEquals = "1" Then
        strDoneEquals = ""
        strCurrentNumber = "0"
        strFormula = ""
        strAction = ""
        txtFormula = ""
    End If

    'add decimal once
    If InStr(1, strCurrentNumber, ".") = 0 Then
        strCurrentNumber = strCurrentNumber + "."
    End If

    txtResult = strCurrentNumber

End Sub

Private Sub cmdPlus_Click()
    Call Operator("+")

End Sub

Private Sub cmdSign_Click()
    'reset if equals done
    If strDoneEquals = "1" Then
        strCurrentNumber = Str(dblTotal)
    End If

    'change sign
    If strCurrentNumber = "0" Then
        'do nothing
    ElseIf InStr(1, strCurrentNumber, "-") = 0 Then
        strCurrentNumber = "-" + strCurrentNumber
    Else
        strCurrentNumber = Mid(strCurrentNumber, 2, Len(strCurrentNumber))
    End If

    If strDoneEquals = "1" Then
        strDoneEquals = ""
        strAction = ""
        strFormula = ""
        txtFormula = strCurrentNumber
    End If

    txtResult = strCurrentNumber

End Sub

Private Sub cmdSubtract_Click()
    Call Operator("-")

End Sub

Private Sub Form_Load()
    strCurrentNumber = "0"
End Sub
